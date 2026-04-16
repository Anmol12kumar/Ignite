const { Schema, model } = require("../connection");

const communityWallSchema = new Schema(
    {
        author_name: { type: String, required: true },
        content: { type: String, required: true },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        userId: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("communitywall", communityWallSchema);
