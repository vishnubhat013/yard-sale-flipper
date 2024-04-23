import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-center text-3xl font-bold mt-48">
        <Link href={"/scan"}>Scan Me</Link>
      </div>
    </>
  );
}
