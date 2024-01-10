open Bindings;
[@react.component]
let make = (~children: React.element) => {
  <>
    <Next.Image
      src="https://picsum.photos/200/300"
      alt="helo"
      placeholder=`blur
      loading=`lazy_
      objectFit=`cover
    />
    <div> {React.string("Max width wrapper")} children </div>
  </>;
};
