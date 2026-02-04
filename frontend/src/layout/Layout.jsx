import Navbar from "../components/Navbar";

export default function Layout(props) {
  const { children } = props;
  return (
    <div className="w-full h-dvh bg-zinc-100 px-2 overflow-x-hidden overflow-y-auto">
      <div className=" h-dvh">{children}</div>
      <div className=" w-full bg-zinc-50 h-1/12 flex items-center justify-center rounded-xl sticky bottom-3">
        <Navbar />
      </div>
    </div>
  );
}
