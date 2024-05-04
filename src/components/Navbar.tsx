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
import validator from "validator";
import { toast } from "sonner";
import Confetti from "react-dom-confetti";

const Navbar = () => {
  const [email, setEmail] = useState("");
  const [confetti, setConfetti] = useState(false);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onSubscribe = () => {
    if (!email) {
      toast.error("Enter email to subscribe");
      setEmail("");
      return;
    } else if (!validator.isEmail(email)) {
      toast.error("Enter a valid email address");
      setEmail("");
      return;
    }

    // saving email address
    fetch("/api/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(async (res) => {
      if (res.status === 200) {
        toast.success("You are now subscribed to AI News");
        setConfetti(true);
        setTimeout(() => {
          setConfetti(false);
        }, 2000);
      } else {
        const msg = await res.text();
        toast.error(msg);
      }
    });

    setEmail("");
  };

  return (
    <>
      <Confetti active={confetti} config={{ elementCount: 300, spread: 300 }} />
      <header className="text-zinc-400 backdrop-blur-sm bg-none border-b-[1px] border-b-zinc-800 body-font">
        <div className="container mx-auto flex flex-wrap px-5 py-3 items-center justify-between">
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
                  <Button
                    onClick={onSubscribe}
                    type="button"
                    variant="secondary"
                  >
                    Subscribe
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </>
  );
};

export default Navbar;
