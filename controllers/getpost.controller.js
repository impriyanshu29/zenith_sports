
import asyncHandler from  "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.model.js";

//mainily these api is use to find alll the posts
const getpost = asyncHandler(async(req,res,next)=>{

        //it's a way to determine the starting point for retrieving data from a list
        //Eg-> if we have 1000 post and we want to get 100 post at a time then we can use startIndex to get the post from 100 to 200
        const page = parseInt(req.query.page)||1;
        const limit = parseInt(req.query.limit)||6;
        let startIndex = (page - 1) * limit;
        if (req.query.startIndex) {
          startIndex = parseInt(req.query.startIndex);
      }


        //http://localhost:8000/api/post/getpost?limit=1
        //in above example we will get value = 1
        //http://localhost:8000/api/post/getpost?order=asc

        const sortDirection = req.query.order === 'asc' ?  1 :-1;

        //However, when no query parameters are provided (e.g., no userId, category, slug, etc.), all of these conditions evaluate to falsy, and their corresponding properties are not included in the object. As a result, the MongoDB query becomes an empty object {}, which effectively means "find all documents in the collection."


        const posts = await Post.find({
            //eg-> http://localhost:8000/api/post/getpost?userId=615f4b3b7b3b3b3b3b3b3b3b
            // the 'userId' exists in the query parameters of the web request. If 'userId' is present, it adds { userId: req.query.userId } to the object; otherwise, it doesn't add anything
            ...(req.query.userId &&{userId:req.query.userId}),
            ...(req.query.category &&{category:req.query.category}),
            ...(req.query.slug &&{slug:req.query.slug}),
            ...(req.query._id &&{_id:req.query._id}),

            //req.query.searchTerm: This part extracts the value of the 'searchTerm' from the query parameters of a web request.
            // req.query.searchTerm && { ... }: This part checks if req.query.searchTerm exists (i.e., it's truthy). If it does, it proceeds with the code inside the curly braces { ... }. If req.query.searchTerm is not present or falsy, this part evaluates to false.
            // $or: This is a logical operator in MongoDB that performs a logical OR operation on an array of two or more expressions. It returns true if at least one expression is true.
            // { title: { $regex: req.query.searchTerm, $options: 'i' } }: This part is a MongoDB query expression. It checks if the 'title' field matches the regular expression specified by req.query.searchTerm with case-insensitive matching ($options: 'i').
            // { content: { $regex: req.query.searchTerm, $options: 'i' } }: Similarly, this part checks if the 'content' field matches the regular expression specified by req.query.searchTerm with case-insensitive matching.
             ...(req.query.searchTerm &&{
                $or :[
                    {title:{$regex:req.query.searchTerm, $options:'i'}},
                    {content:{$regex:req.query.searchTerm, $options:'i'}},
                ],
            })
            // this line of code constructs a MongoDB query to sort the documents based on their 'updatedAt' field, skip a certain number of documents from the beginning, and limit the total number of documents returned.
}).sort ({updateAt:sortDirection}).skip(startIndex).limit(limit);

//to get total number of post
const totalPost = await Post.countDocuments();
const now = new Date();
const one_month_ago = new Date (
    now.getFullYear(),
    now.getMonth()-1,
    now.getDate()
)

const lastMonthPosts = await Post.countDocuments({
    createdAt:{$gte:one_month_ago}
})

return res.status(201).json(
    new apiResponse(
      201,
      {
        post:{
            posts,totalPost,lastMonthPosts
        }
      },
      "Post found sucessfully"
    )
  );





})

export default getpost 