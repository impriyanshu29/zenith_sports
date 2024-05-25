import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";

import { apiResponse } from "../utils/apiResponse.js";
import Event from "../models/event.model.js";

export const createEvent = asyncHandler(async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new apiError(403, "Unauthorized access");
    }
  
    const event = await Event.create(req.body);
  
    if (!event) {
      throw new apiError(500, "Event not created");
    }
  
    const timestamp = Date.now();
    const slug = `${req.body.eventName
      .toLowerCase()
      .split(" ")
      .join("-")}-${timestamp}`;
  
    const createdEvent = await Event.findByIdAndUpdate(
      event._id,
      {
        $set: {
          slug: slug,
        },
      },
      {
        new: true,
      }
    ).select("-__v");
  
    return res
      .status(201)
      .json(new apiResponse(createdEvent, "Event created successfully", 201));

  } catch (error) {
    throw new apiError(500, "Error creating event");
  }  });

export const getEvent = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  let startIndex = (page - 1) * limit;
  if (req.query.startIndex) {
    startIndex = parseInt(req.query.startIndex);
  }

  const sortDirection = req.query.order === "asc" ? 1 : -1;
  const events = await Event.find({
    ...(req.query.eventId && { _id: req.query.eventId }),
    ...(req.query.slug && { slug: req.query.slug }),
    ...(req.query.eventCategory && { batch: req.query.eventCategory }),
    ...(req.query.searchEvent && {
      $or: [
        { eventName: { $regex: req.query.searchAlumni, $options: "i" } },
        { eventCategory: { $regex: req.query.searchAlumni, $options: "i" } },
        { eventOrganizer: { $regex: req.query.searchAlumni, $options: "i" } },
      ],
    }),
  })
    .sort({ createdAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

  
  return res.status(201).json(
    new apiResponse(
      events,
      "Event found successfully",
      201
    )
  );
});

export const deleteEvent = asyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin && req.user._id.toString() !== req.params.userId) {
    throw new apiError(403, "Oops !! Sorry but you are not allowed");
  }

  const event = await Event.findByIdAndDelete(req.params.eventId);
  if (!event) {
    throw new apiError(
      404,
      "Hey !! I think these event is already deleted"
    );
  }
  res.status(200).json({
    message: "Sad!! to see that number of Event is decreased",
  });
});


export const updateEvent = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user.isAdmin && req.user._id.toString() !== req.params.userId) {
      throw new apiError(403, "Oops !! Sorry but you are not allowed");
    }
  
      const event = await Event.findByIdAndUpdate(req.params.eventId, 
      req.body, {
      new: true,
      runValidators: true,
      });
  
    if (!event) {
      throw new apiError(
        404,
        "Hey !! I think these event details is already updated"
      );
    }
  
    return res
      .status(201)
      .json(new apiResponse(event, "Event updated successfully", 201));
  } catch (error) {
    throw new apiError(500, "Error updating event");
  }
}
);
 
export const oneEvent  = asyncHandler(async (req, res, next) => {
   try {
    
     const event = await Event.findById(req.params.eventId);
     if (!event) {
         throw new apiError(404, "Event not found");
     }
     res.status(200).json(new apiResponse(event, "Event found", 200));
   } catch (error) {
    throw new apiError(500, "Error getting event");
   }
    });