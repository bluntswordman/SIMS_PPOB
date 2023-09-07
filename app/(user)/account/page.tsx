
import { FormAccount, FormProfileImage } from "@user/_components";

export default function AccountPage() {
  return (
    <main className="w-full min-h-screen pt-24 pb-10">
      <div className="container px-10 mx-auto flex flex-col items-center space-y-8 w-full h-full">
        <FormProfileImage />
        <FormAccount />
      </div>
    </main>
  );
}
