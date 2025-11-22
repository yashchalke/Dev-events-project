import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

export default function AuthButton() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="w-28 h-10" />
    );
  }

  return (
    <div className=" h-10 flex items-center justify-center">
      <SignedOut>
        <div className="button1">
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </div>
  );
}
