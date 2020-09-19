import { useEffect, useState } from 'react';

let timeoutOne;
let timeoutTwo;
let timeoutThree;

const fade = (fnOne, fnTwo, fnThree, inBool, msStep) => {
  timeoutOne = setTimeout(
    () => {
      fnOne(inBool);
      timeoutTwo = setTimeout(() => {
        fnTwo(inBool);
      }, msStep);
      timeoutThree = setTimeout(() => {
        fnThree(inBool);
      }, msStep * 2);
    },
    inBool ? 0 : msStep * 3
  );
};

export default (matches, ms) => {
  const [arrowOneFade, setArrowOneFade] = useState(false);
  const [arrowTwoFade, setArrowTwoFade] = useState(false);
  const [arrowThreeFade, setArrowThreeFade] = useState(false);

  useEffect(() => {
    fade(setArrowThreeFade, setArrowTwoFade, setArrowOneFade, true, ms);
    fade(setArrowThreeFade, setArrowTwoFade, setArrowOneFade, false, ms);

    const fadeInAndOut = setInterval(() => {
      if (!matches) clearInterval(fadeInAndOut);
      fade(setArrowThreeFade, setArrowTwoFade, setArrowOneFade, true, ms);
      fade(setArrowThreeFade, setArrowTwoFade, setArrowOneFade, false, ms);
    }, 2000);

    return () => {
      clearInterval(fadeInAndOut);
      clearTimeout(timeoutOne);
      clearTimeout(timeoutTwo);
      clearTimeout(timeoutThree);
      setArrowOneFade(false);
      setArrowTwoFade(false);
      setArrowThreeFade(false);
    };
  }, [matches, ms]);

  return [arrowOneFade, arrowTwoFade, arrowThreeFade];
};
