import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description required"],
    },
    price: {
      type: Number,
      required: [true, "Product price required"],
    },
    // rating: {
    //   type: Number,
    //   default: 0,
    // },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        img_url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Product category required"],
    },
    // stock: {
    //   type: Number,
    //   default: 1,
    // },
    // total_reviews: {
    //   type: Number,
    //   default: 0,
    // },
    // review: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     rating: {
    //       type: Number,
    //       required: true,
    //     },
    //     comment: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
