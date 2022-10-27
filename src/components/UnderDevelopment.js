import developer from "./../assets/img/developer.png";

const UnderDevelopemnt = () => {
  return (
    <div className="bg-white shadow grid place-items-center h-[600px] rounded">
      <div className="text-center space-y-3">
        <img src={developer} alt="developer" className="w-full lg:w-[300px]" />
        <h3 className="font-bold text-xl">Under Development</h3>
      </div>
    </div>
  );
};

export default UnderDevelopemnt;
