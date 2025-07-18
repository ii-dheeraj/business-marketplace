export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="ml-4 h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-16 w-96 bg-blue-400 rounded mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 w-80 bg-blue-400 rounded mx-auto mb-8 animate-pulse"></div>
          <div className="bg-white rounded-lg p-2 shadow-lg max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="h-11 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 h-11 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-11 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-12 animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border rounded-lg p-6 text-center animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded mx-auto mb-3"></div>
                <div className="h-4 w-16 bg-gray-200 rounded mx-auto mb-1"></div>
                <div className="h-3 w-12 bg-gray-200 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
