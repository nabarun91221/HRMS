// models/documentEmbedding.model.js

import mongoose from "mongoose";

const documentEmbeddingSchema =
    new mongoose.Schema({

        content: {
            type: String,
        },

        metadata: {
            source: {
                type: String,
                required: true
            },

            page: {
                type: Number,
                required: true
            },

            chunk: {
                type: Number,
                required: true
            }
        },

        embedding: {
            type: [Number],
            required: true
        }

    }, {
        timestamps: true
    });

export default mongoose.model(
    "DocumentEmbedding",
    documentEmbeddingSchema
);
