import { getUser } from "../../../helpers/auth";
import usePostItem from "../hooks/usePostItem";

const PostItem = ({ id, data }) => {
  const { handleRemove, handleEdit } = usePostItem();
  
  return (
    <div className="flex justify-start items-start flex-col">
      <div className="p-3 flex justify-start items-center space-x-2">
        <div className="rounded-full bg-gray-50 border border-gray-500 h-8 w-8"></div>
        <div className="text-sm">
          {data.postedBy}
        </div>
      </div>
      <div className="h-60 bg-gray-100 w-full">
        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.photo}`} alt="photo" className="w-full h-full object-cover" />
      </div>
      <div className="p-3 text-sm w-full">
        {
          data.postedBy === getUser().username && (
            <div className="mb-2 text-right">
              <button onClick={() => handleEdit(id)} type="button" className="text-gray-500 border rounded-lg border-gray-500 px-3 py-1 hover:text-gray-300 hover:border-gray-300 mr-1">Edit</button>
              <button onClick={() => handleRemove(id)} type="button" className="text-red-500 border rounded-lg border-red-500 px-3 py-1 hover:text-red-300 hover:border-red-300">Remove</button>
            </div>
          )
        }
        <p> <span className="font-bold"> {data.postedBy} </span> {data.caption} </p>
      </div>
    </div>
  )
}

export default PostItem;
