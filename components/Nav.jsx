"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProvider] = useState(null);
  const [toggleDrodown, setToggleDrodown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProvider(response);
    };

    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Dreamstopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Dreamstopia</p>
      </Link>

      {/* Dekstop navigation */}
      <div className="sm:flex hidden">
        {/* jika diatas 640px maka akan muncul (sm) */}
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-dream"} className="black_btn">
              Create Dream
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {/* jika diatas 640 px maka akan hidden */}
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDrodown((prev) => !prev)}
              //   better way to handle opposite value
            />
            {toggleDrodown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDrodown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-dream"}
                  className="dropdown_link"
                  onClick={() => setToggleDrodown(false)}
                >
                  Create Dream
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDrodown(True);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
