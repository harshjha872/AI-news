import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Navbar = () => {
  const [email, setEmail] = useState("");

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <header className="text-zinc-400 backdrop-blur-sm bg-none border-b-[1px] border-b-zinc-800 body-font">
      <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
        <a className="flex title-font font-medium items-center text-white">
          <span className="text-xl">AI News</span>
        </a>
        {/* <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white">First Link</a>
          <a className="mr-5 hover:text-white">Second Link</a>
          <a className="mr-5 hover:text-white">Third Link</a>
          <a className="mr-5 hover:text-white">Fourth Link</a>
        </nav> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Subscribe</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="pt-2 pb-1">
                AI News subscription ✨
              </DialogTitle>
              <DialogDescription className="pb-2">
                Please enter your email address to recieve AI related news
                daily!!
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={onEmailChange}
                  placeholder="your email here..."
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end pt-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Subscribe
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Navbar;
