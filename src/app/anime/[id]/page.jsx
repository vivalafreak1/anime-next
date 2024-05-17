import { getAnimeResponse } from "@/libs/api";
import VideoPlayer from "@/components/Utilities/VideoPlayer";
import Image from "next/image";

export default async function Page({ params: { id } }) {
  const anime = await getAnimeResponse(`anime/${id}`);
  const characterResponse = await getAnimeResponse(`anime/${id}/characters`);

  // Limit the characters to the first four
  const limitedCharacters = characterResponse.data.slice(0, 6);

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      {/* Row 1 */}
      <div className="flex flex-wrap justify-center w-full gap-8 mb-8 max-w-screen-2xl">
        <Image
          src={anime.data.images.webp.image_url}
          alt={anime.data.title}
          width={250}
          height={250}
          className="object-cover rounded"
        />
        <div className="flex flex-col justify-center text-color-primary">
          <h1 className="mb-4 text-3xl font-bold">{anime.data.title}</h1>
          <p className="mb-2 text-color-secondary">
            Judul Asli: {anime.data.title_japanese}
          </p>
          <p className="mb-2 text-color-secondary">
            Tahun rilis: {anime.data.year}
          </p>
          <p className="mb-2 text-color-secondary">
            Rating: {anime.data.rating}
          </p>
          <p className="mb-2 text-color-secondary">
            Genre:
            {anime.data.genres.map((genre) => (
              <span key={genre.mal_id} className="ml-1">
                {genre.name}
              </span>
            ))}
          </p>
          <p className="mb-2 text-color-secondary">
            Peringkat: {anime.data.rank}
          </p>
          <p className="mb-2 text-color-secondary">
            Studio:
            {anime.data.studios.map((studio) => (
              <span key={studio.mal_id} className="ml-1">
                {studio.name}
              </span>
            ))}
          </p>
          <p className="mb-2 text-color-secondary">Skor: {anime.data.score}</p>
          <p className="mb-2 text-color-secondary">
            Status: {anime.data.status}
          </p>
          <p className="mb-2 text-color-secondary">
            Durasi: {anime.data.duration}
          </p>
          <p className="mb-2 text-color-secondary">
            Jumlah episode: {anime.data.episodes}
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full mb-8 border-t border-color-secondary max-w-screen-2xl" />

      {/* Row 2 */}
      <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />

      {/* Row 3 */}
      <div className="w-full mb-8 max-w-screen-2xl">
        <h2 className="mb-4 text-2xl font-bold text-color-primary">Sinopsis</h2>
        <p className="text-justify text-color-secondary">
          {anime.data.synopsis}
        </p>
      </div>

      {/* Divider */}
      <hr className="w-full mb-8 border-t border-color-secondary max-w-screen-2xl" />

      {/* Row 4 */}
      <div className="w-full max-w-screen-2xl">
        <h2 className="mb-4 text-2xl font-bold text-color-primary">Karakter</h2>
        <div className="flex gap-8 overflow-x-auto">
          {limitedCharacters.map((char) => (
            <div key={char.character.mal_id} className="flex-none w-60">
              <Image
                src={char.character.images.webp.image_url}
                alt={char.character.name}
                width={100}
                height={150}
                className="object-cover rounded"
              />
              <div>
                <h3 className="text-xl font-bold text-color-primary">
                  {char.character.name}
                </h3>
                <p className="text-color-secondary">Role: {char.role}</p>
                {char.voice_actors.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <Image
                      src={char.voice_actors[0].person.images.jpg.image_url}
                      alt={char.voice_actors[0].person.name}
                      width={50}
                      height={50}
                      className="object-cover rounded-full"
                    />
                    <p className="text-color-secondary">
                      {char.voice_actors[0].person.name} (
                      {char.voice_actors[0].language})
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
