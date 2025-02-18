export default function PostEditPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="font-bold text-2xl">글쓰기</h1>
      <textarea
        className="mt-4 w-full rounded border p-2"
        rows={10}
        placeholder="내용을 입력하세요"
      />
    </div>
  )
}
