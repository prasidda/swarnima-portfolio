import ArtworkForm from "@/components/admin/ArtworkForm";

export default function UploadPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl tracking-wide">Upload Artwork</h1>
        <p className="text-sm text-text-secondary mt-1">
          Add a new piece to your collection.
        </p>
      </div>
      <ArtworkForm mode="create" />
    </div>
  );
}
