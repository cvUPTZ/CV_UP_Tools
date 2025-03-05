import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function GoogleAuthButtonStoryboard() {
  return (
    <div className="bg-gray-100 p-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <GoogleAuthButton onSuccess={(res) => console.log(res)} />
      </div>
    </div>
  );
}
