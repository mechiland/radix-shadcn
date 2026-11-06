type Person = {
	image: string;
	name: string;
};

const person01: Person = {
	image: "images/radix-home/avatar-bb57a6fa1db7.jpg",
	name: "Joaquin Verdugo",
};
const person02: Person = {
	image: "images/radix-home/avatar-1186549dca55.jpg",
	name: "Sayako Imamura",
};
const person03: Person = {
	image: "images/radix-home/avatar-ae1ffb43a31f.jpg",
	name: "Zac Wight",
};
const person04: Person = {
	image: "images/radix-home/avatar-c2f399b5d3c3.jpg",
	name: "Alice Correia",
};
const person05: Person = {
	image: "images/radix-home/avatar-0306536f2f7b.jpg",
	name: "Emmeline Labrie",
};
const person06: Person = {
	image: "images/radix-home/avatar-93be87f6ad2e.jpg",
	name: "Mei Tang",
};
const person07: Person = {
	image: "images/radix-home/avatar-7c6a70f3c2ad.jpg",
	name: "Danilo Sousa",
};
const person08: Person = {
	image: "images/radix-home/avatar-9ce8663daee5.jpg",
	name: "Teodros Girmay",
};
const person09: Person = {
	image: "images/radix-home/avatar-f385c5989c20.jpg",
	name: "Zahra Ambessa",
};
const person10: Person = {
	image: "images/radix-home/avatar-1d9f8db7e76c.jpg",
	name: "Lucy Walters",
};
const person11: Person = {
	image: "images/radix-home/avatar-4aa4cec037ee.jpg",
	name: "Aixa Díaz",
};
const person12: Person = {
	image: "images/radix-home/avatar-34c6c1a05162.jpg",
	name: "Claudia Schroeder",
};
const person13: Person = {
	image: "images/radix-home/avatar-a693a603125c.jpg",
	name: "Poppy Nicholls",
};
const person14: Person = {
	image: "images/radix-home/avatar-e337ab7e16d1.jpg",
	name: "Lin Chu",
};
const person15: Person = {
	image: "images/radix-home/avatar-dfa4fb4e4cda.jpg",
	name: "Tilde Thygesen",
};
const person16: Person = {
	image: "images/radix-home/avatar-8f9305bb517d.jpg",
	name: "Craig Caldwell",
};
const person17: Person = {
	image: "images/radix-home/avatar-90ba09b7abf8.jpg",
	name: "Marisa Palermo",
};
const person18: Person = {
	image: "images/radix-home/avatar-0487a5a89e61.jpg",
	name: "Branda Sousa",
};
const person19: Person = {
	image: "images/radix-home/avatar-089bca6e8af2.jpg",
	name: "Grace Ford",
};
const person20: Person = {
	image: "images/radix-home/avatar-586d012dbf59.jpg",
	name: "Freja Johnsen",
};
const person21: Person = {
	image: "images/radix-home/avatar-55fec21a6703.jpg",
	name: "Da-Xia Wu",
};
const person22: Person = {
	image: "images/radix-home/avatar-711be420beb9.jpg",
	name: "Klara Grubišić",
};
const person23: Person = {
	image: "images/radix-home/avatar-cedf828cb8d0.jpg",
	name: "Tómas Njálsson",
};
const person24: Person = {
	image: "images/radix-home/avatar-a7982bf00b04.jpg",
	name: "Harrison Mellor",
};
const person25: Person = {
	image: "images/radix-home/avatar-a7f96ffb1546.jpg",
	name: "Thiery Sicard",
};
const person26: Person = {
	image: "images/radix-home/avatar-fd866d2bdd8d.jpg",
	name: "Gizela Kavková",
};
const person27: Person = {
	image: "images/radix-home/avatar-6defe7c40601.jpg",
	name: "Travis Ross",
};
const person28: Person = {
	image: "images/radix-home/avatar-792bed9b20c4.jpg",
	name: "Cathy Downs",
};
const person29: Person = {
	image: "images/radix-home/avatar-e59c6d8cbb5f.jpg",
	name: "Jasper Eriksson",
};
const person30: Person = {
	image: "images/radix-home/avatar-81acc3c14693.jpg",
	name: "Matias Hanski",
};

const allPeople = [
	person01,
	person02,
	person03,
	person04,
	person05,
	person06,
	person07,
	person08,
	person09,
	person10,
	person11,
	person12,
	person13,
	person14,
	person15,
	person16,
	person17,
	person18,
	person19,
	person20,
	person21,
	person22,
	person23,
	person24,
	person25,
	person26,
	person27,
	person28,
	person29,
	person30,
];

// neutral
const neutralPeople = [person15, person03, person05, person01, person09, person16, person24];

type Color =
	| "tomato"
	| "red"
	| "ruby"
	| "crimson"
	| "pink"
	| "plum"
	| "purple"
	| "violet"
	| "iris"
	| "indigo"
	| "blue"
	| "sky"
	| "cyan"
	| "teal"
	| "mint"
	| "jade"
	| "green"
	| "lime"
	| "grass"
	| "brown"
	| "orange"
	| "amber"
	| "yellow"
	| "gold"
	| "bronze";

function getPeopleForColor(color: Color) {
	switch (color) {
		case "tomato":
		case "red":
		case "ruby":
			return [person07, person17, person19];
		case "crimson":
		case "pink":
			return [person02, person14, person30, person19];
		case "plum":
		case "purple":
		case "violet":
			return [person02, person06, person14, person30];
		case "iris":
		case "indigo":
		case "blue":
		case "sky":
			return [person11, person20, person27];
		case "cyan":
		case "teal":
		case "mint":
			return [person10, person20, person23, person28];
		case "jade":
		case "green":
		case "lime":
			return [person21, person26, person29];
		case "grass":
			return [person21, person22, person26, person29];
		case "brown":
			return [person04, person13, person18, person25];
		case "orange":
		case "amber":
			return [person08, person12, person13, person25];
		case "yellow":
			return [person12, person24, person29];
		case "gold":
		case "bronze":
			return neutralPeople;
	}
}

function generatePeopleByColorScale() {
	return (
		[
			"tomato",
			"red",
			"ruby",
			"crimson",
			"pink",
			"plum",
			"purple",
			"violet",
			"iris",
			"indigo",
			"blue",
			"sky",
			"cyan",
			"teal",
			"jade",
			"mint",
			"green",
			"lime",
			"grass",
			"brown",
			"orange",
			"amber",
			"yellow",
			"gold",
			"bronze",
		] as const
	).reduce(
		(peopleByColorScale, color) => {
			peopleByColorScale[color] = getPeopleForColor(color);
			return peopleByColorScale;
		},
		{} as Record<Color, Person[]>,
	);
}

function avatar(id: string, params?: { x?: number; y?: number; zoom?: number }) {
	let crop = "";
	if (params === undefined) {
		crop = "faces";
	} else {
		const { x = 0.5, y = 0.5, zoom = 1 } = params ?? {};
		crop = `focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}`;
	}
	return `images/radix-home/97cf571dd8b3.jpg`;
}

const peopleByColorScale = generatePeopleByColorScale();

function email(name: string) {
	return (
		name
			.toLocaleLowerCase()
			.replace(" ", ".")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "") + "@example.com"
	);
}
export { allPeople, email, peopleByColorScale, neutralPeople };
