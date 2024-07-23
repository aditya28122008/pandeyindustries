import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-600 dark:text-green-400">
          404
        </h1>
        <p className="text-lg mt-4 text-gray-800 dark:text-gray-200">
          Oops! Page not found.
        </p>
        <Link
          href="/"
          className="text-green-500 dark:text-green-300 mt-4 block hover:underline"
        >
          Go back To home
        </Link>
      </div>
    </div>
  );
}
export default NotFound