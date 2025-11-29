import Alpine from "alpinejs";
// Import YAML data - English
import educationEn from "@/data/en/education.yaml";
import experienceEn from "@/data/en/experience.yaml";
import profileEn from "@/data/en/profile.yaml";
import skillsEn from "@/data/en/skills.yaml";
import uiEn from "@/data/en/ui.yaml";
// Import YAML data - Portuguese
import educationPtBR from "@/data/pt-BR/education.yaml";
import experiencePtBR from "@/data/pt-BR/experience.yaml";
import profilePtBR from "@/data/pt-BR/profile.yaml";
import skillsPtBR from "@/data/pt-BR/skills.yaml";
import uiPtBR from "@/data/pt-BR/ui.yaml";

// Type definitions
interface I18nData {
	profile: typeof profilePtBR;
	skills: typeof skillsPtBR;
	experience: typeof experiencePtBR;
	education: typeof educationPtBR;
	ui: typeof uiPtBR;
}

interface I18nStore {
	"pt-BR": I18nData;
	en: I18nData;
}

type Lang = "pt-BR" | "en";

// Generate Schema.org JSON-LD data from profile data
function generateSchemaOrgData(lang: Lang): object {
	const profile = i18n[lang].profile;
	const education = i18n[lang].education;

	return {
		"@context": "https://schema.org",
		"@type": "ProfilePage",
		mainEntity: {
			"@type": "Person",
			name: profile.name,
			jobTitle: profile.title,
			email: profile.contact.email,
			telephone: profile.contact.phone,
			url: "https://joaovjo.com.br",
			sameAs: [profile.contact.linkedin, profile.contact.github],
			knowsAbout: [
				"PHP",
				"Laravel",
				"Django",
				"Python",
				"Docker",
				"REST API",
				"MySQL",
				"PostgreSQL",
				"Git",
				"Linux",
				"React",
				"JavaScript",
				"TypeScript",
				"Tailwind CSS",
				"Microservices",
			],
			hasCredential: education.degrees.map((degree: { course: string }) => ({
				"@type": "EducationalOccupationalCredential",
				name: degree.course,
				credentialCategory: "degree",
			})),
		},
	};
}

// Update Schema.org data in the DOM
function updateSchemaOrgData(lang: Lang): void {
	const schemaScript = document.getElementById("schema-org-data");
	if (schemaScript) {
		schemaScript.textContent = JSON.stringify(generateSchemaOrgData(lang));
	}
}

// Build i18n data structure
const i18n: I18nStore = {
	"pt-BR": {
		profile: profilePtBR,
		skills: skillsPtBR,
		experience: experiencePtBR,
		education: educationPtBR,
		ui: uiPtBR,
	},
	en: {
		profile: profileEn,
		skills: skillsEn,
		experience: experienceEn,
		education: educationEn,
		ui: uiEn,
	},
};

// Detect initial language
function detectLanguage(): Lang {
	// Check localStorage first
	const saved = localStorage.getItem("lang") as Lang | null;
	if (saved && (saved === "pt-BR" || saved === "en")) {
		return saved;
	}

	// Check URL path
	if (window.location.pathname.startsWith("/en")) {
		return "en";
	}

	// Check browser language
	const browserLang = navigator.language;
	if (browserLang.startsWith("pt")) {
		return "pt-BR";
	}

	// Default to English
	return "en";
}

// Initialize Alpine stores before starting
document.addEventListener("alpine:init", () => {
	// Language store
	Alpine.store("lang", detectLanguage());

	// i18n data store
	Alpine.store("i18n", i18n);

	// Getter for current language data
	Alpine.magic("t", () => {
		return () => {
			const lang = Alpine.store("lang") as Lang;
			return (Alpine.store("i18n") as I18nStore)[lang];
		};
	});

	// Language setter with persistence
	Alpine.store("setLang", (newLang: Lang) => {
		Alpine.store("lang", newLang);
		localStorage.setItem("lang", newLang);
		document.documentElement.lang = newLang;
	});

	// Dark mode store with persistence
	const savedDarkMode = localStorage.getItem("darkMode");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	Alpine.store(
		"darkMode",
		savedDarkMode ? savedDarkMode === "true" : prefersDark,
	);

	// Dark mode toggle
	Alpine.store("toggleDarkMode", () => {
		const current = Alpine.store("darkMode") as boolean;
		Alpine.store("darkMode", !current);
		localStorage.setItem("darkMode", String(!current));
	});
});

// Update document language on store change
document.addEventListener("alpine:initialized", () => {
	const lang = Alpine.store("lang") as Lang;
	document.documentElement.lang = lang;

	// Watch for dark mode changes
	Alpine.effect(() => {
		const darkMode = Alpine.store("darkMode") as boolean;
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});

	// Watch for language changes and update Schema.org data
	Alpine.effect(() => {
		const lang = Alpine.store("lang") as Lang;
		document.documentElement.lang = lang;
		updateSchemaOrgData(lang);
	});
});

// Extend window for Alpine
declare global {
	interface Window {
		Alpine: typeof Alpine;
	}
}

window.Alpine = Alpine;
Alpine.start();
