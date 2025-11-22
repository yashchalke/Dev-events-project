interface Props{
    Gradient:number;
}

const GradientLayout = ({Gradient}:Props) => {
  return (
        <div className="absolute -z-10 h-screen w-full">
        {Array.from({ length: Gradient }).map((_, index) => (
        <div  key={index}>
        <div className='flex flex-col h-screen w-full items-center justify-center'>
        <div className='w-[50%] md:h-[50%] h-full bg-bg-main md:blur-[300px] blur-[100px]'></div>
        </div>
        <div className="h-20 bg-black"></div>
        </div>
        ))}
        </div>
  )
}

export default GradientLayout