export default function Add() {
  return (
    <div className="w-full h-1/4 bg-gray-900 rounded-xl  px-4 py-2 flex items-center justify-center">
      <div className="flex flex-col flex-2 items-start justify-center h-full gap-2">
        <h2 className="text-xl font-semibold text-start">Jangan sampai --</h2>
        <p className="text-start  text-md">
          Hemat uang anda hingga 50% untuk product favorite
        </p>
      </div>
      <div className="flex-1 h-full content-center">
        <img
          src={
            "https://i.pinimg.com/736x/7c/d0/eb/7cd0eb294e3a76c457f580a4ecd7c22d.jpg"
          }
          alt=""
          className="rounded-md"
        />
      </div>
    </div>
  );
}
