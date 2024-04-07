import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  sku: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  supplier: { type: String, required: true },
  discount: { type: Number, default: 0 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 1 },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  slug: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
