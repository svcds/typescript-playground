// Primitives
const PAGE_TITLE: string = "Home Page";

// Unions
type Age = string | number; // 21, "young", "18 months"

// Enums
enum JobTitle {
  ProductionAssistant = "Production Assistant",
  Manager = "Manager",
}

// Objects
type Person = {
  name: string;
  age?: Age;
  bio: string;
  jobTitle?: JobTitle;
  favoritecolor?: string;
};

const BILL: Person = {
  name: "Bill",
  age: 43,
  bio: "Bill likes writing TypeScript & jogging in the twilight.",
  jobTitle: JobTitle.Manager,
};

const JANET: Person = {
  name: "Janet",
  age: "no comment",
  bio: "Janet loves movies & oil painting. She paints large scale portraits of wildlife.",
  jobTitle: JobTitle.ProductionAssistant,
};

type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
};

// Arrays
const IMAGES: Image[] = [
  {
    url: "http://via.placeholder.com/640x360",
    width: 640,
    height: 360,
    id: "img1",
  },
  {
    url: "http://via.placeholder.com/400x400",
    width: 400,
    height: 400,
    id: "img2",
  },
];

// Functions
function getPersonTitle(person: Person) {
  const personTitlePieces: string[] = [person.name];

  if (person.age) {
    personTitlePieces.push(`Age: ${person.age}`);
  }

  if (person.jobTitle) {
    personTitlePieces.push(`Job Title: ${person.jobTitle}`);
  }

  return personTitlePieces.join(" | ");
}

// A type-guard function using a type predicate
// This function doesn't test every property, a more robust solution would
// be needed in production code
function isPerson(unknownData: any): unknownData is Person {
  return (
    typeof unknownData.bio === "string" && typeof unknownData.name === "string"
  );
}

const DEFAULT_PERSON: Person = {
  name: "N/A",
  bio: "N/A",
};

// An example of how to use our type-guard function above to return a specific
// data type
function returnAnythingAsPerson(data: any): Person {
  if (isPerson(data)) {
    return data;
  }

  return DEFAULT_PERSON;
}

// No warnings since we made sure `returnAnythingAsPerson` always returns a valid
// person
console.log(returnAnythingAsPerson(undefined).bio.toLowerCase());

// React Components

type PersonCardProps = {
  person: Person;
};
function PersonCard({ person }: PersonCardProps) {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "0.5rem",
        margin: "1rem",
        boxShadow: "0 0 0.5rem rgba(0,0,0,0.4)",
      }}
    >
      <h3>{getPersonTitle(person)}</h3>
      <p>{person.bio}</p>
    </div>
  );
}

type ImageGalleryProps = {
  images: Image[];
};

function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div>
      {images.map(({ id, url, width, height }) => (
        <div
          style={{
            background: "#f2f2f2",
            maxWidth: "300px",
            padding: "1rem",
            border: "1px solid #ddd",
            marginBottom: "1rem",
          }}
        >
          <img
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
            key={id}
            src={url}
            width={width}
            height={height}
          />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <h1>{PAGE_TITLE}</h1>
      <h2>Employee Directory</h2>
      <PersonCard person={JANET} />
      <PersonCard person={BILL} />
      <h2>Image Gallery</h2>
      <ImageGallery images={IMAGES} />
    </>
  );
}
