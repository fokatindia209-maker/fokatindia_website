import { Star } from "lucide-react";

export default function ReviewItem({ name, review }: any) {
  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{name}</h3>
        <Star size={18} className="text-yellow-500 fill-yellow-500" />
      </div>

      <p className="text-gray-500 mt-2">{review}</p>
    </div>
  );
}