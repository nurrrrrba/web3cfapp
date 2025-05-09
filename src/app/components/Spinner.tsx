export default function Spinner() {
    return (
      <div className="flex justify-center items-center py-10">
        <div
          className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }
  