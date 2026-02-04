export default function BrandIcon() {
  const brandProduct = [
    {
      title: "Uniqlo",
      image:
        "https://i.pinimg.com/736x/a5/6f/00/a56f00c7c821162770f68208bcf63ec2.jpg",
    },
    {
      title: "Nike",
      image:
        "https://i.pinimg.com/736x/d7/70/b9/d770b96ea3d43efbf5bdac06a0d589a8.jpg",
    },
    {
      title: "Adidas",
      image:
        "https://i.pinimg.com/736x/26/07/ec/2607ec7542fef2a25e40236c67187630.jpg",
    },
    {
      title: "The ",
      image:
        "https://i.pinimg.com/736x/6c/14/ee/6c14ee37c302f82bd4f0f813989611ed.jpg",
    },
    {
      title: "NB",
      image:
        "https://i.pinimg.com/736x/06/43/16/064316753135bbfb80433121dd897904.jpg",
    },
    {
      title: "H&M",
      image:
        "https://i.pinimg.com/736x/13/19/c0/1319c023694bb21a9f668796c6ea33b6.jpg",
    },
  ];
  return (
    <>
      {brandProduct.map((item, index) => {
        return (
          <div className="aspect-square w-1/8">
            <img
              src={item.image}
              alt=""
              className="rounded-full aspect-square"
            />
            <h2 className="text-zinc-900 font-semibold text-sm mt-4">
              {item.title}
            </h2>
          </div>
        );
      })}
    </>
  );
}
