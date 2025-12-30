'use client';
import Start from '../components/Start';
import FAQ from '../components/FAQ';
import BookCallForm from '../components/BookCallForm';
import { handleSmoothScroll } from '../utils/smoothScroll';

export default function TestPage() {
  const onSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    handleSmoothScroll(e, targetId);
  };
  return (
    <div className="flex min-h-screen w-full mx-auto flex-col items-center bg-white">
      <div className="w-full flex flex-col items-center mt-25">
        <Start onSmoothScroll={onSmoothScroll} />
        <BookCallForm onSmoothScroll={onSmoothScroll} />
        <FAQ onSmoothScroll={onSmoothScroll} />
      </div>
    </div>
  );
}
