"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";

export default function SocialLinks({socialData}: {socialData: any}) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const allNames = Object.fromEntries(formData.entries())


        try {
            const res = await myFetch("/social/create", {
                method: "POST",
                body: allNames,
            });
            

            if (res?.success) {
                toast.success(res?.message || "Social links saved");
            } else {
                toast.error(res?.message || "Failed to save social links");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "An error occurred");
        }
    };
  
    


	return (
    <div className="bg-white h-full rounded-2xl p-5">
        
        <div className="flex items-center justify-center h-full">
            <div className="max-w-md w-full">
                <h1 className="text-center text-3xl font-bold text-gray-500 mb-6">Social Link</h1>
                <form onSubmit={handleSubmit}>
                    <div className="my-2">
                        <Label>Tiktok</Label>
                        <Input name='tikTokUrl' placeholder="Enter your tiktok link" defaultValue={socialData?.tikTokUrl} />
                    </div>
                    <div className="my-2">
                          <Label>Facebook</Label>
                        <Input name="facebookUrl" placeholder="Enter your facebook link" defaultValue={socialData?.facebookUrl} />
                    </div>
                    <div className="my-2">
                          <Label>Instagram</Label>
                        <Input name="instagramUrl" placeholder="Enter your instagram link" defaultValue={socialData?.instagramUrl} />
                    </div>
                    <div className="my-2">
                          <Label>Email</Label>
                        <Input name="email" placeholder="Enter your email link" defaultValue={socialData?.email} />
                    </div>

                    <div className="mt-10">
                      <Button className="w-full" type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}