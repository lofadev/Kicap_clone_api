import mongoose from 'mongoose';

const OrderDetailsSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderDetail = mongoose.model('OrderDetail', OrderDetailsSchema);
export default OrderDetail;
