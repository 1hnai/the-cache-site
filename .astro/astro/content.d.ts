declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"aer-city-pack-pro-2.md": {
	id: "aer-city-pack-pro-2.md";
  slug: "aer-city-pack-pro-2";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"aer-day-pack-3.md": {
	id: "aer-day-pack-3.md";
  slug: "aer-day-pack-3";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"aesop-anouk-eau-de-parfum.md": {
	id: "aesop-anouk-eau-de-parfum.md";
  slug: "aesop-anouk-eau-de-parfum";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"aesop-eidesis-eau-de-parfum.md": {
	id: "aesop-eidesis-eau-de-parfum.md";
  slug: "aesop-eidesis-eau-de-parfum";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"aesop-geranium-leaf-body-balm.md": {
	id: "aesop-geranium-leaf-body-balm.md";
  slug: "aesop-geranium-leaf-body-balm";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"aesop-hwyl-eau-de-parfum.md": {
	id: "aesop-hwyl-eau-de-parfum.md";
  slug: "aesop-hwyl-eau-de-parfum";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"aesop-rind-concentrate-body-balm.md": {
	id: "aesop-rind-concentrate-body-balm.md";
  slug: "aesop-rind-concentrate-body-balm";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"aime-leon-dore-striped-rugby-shirt.md": {
	id: "aime-leon-dore-striped-rugby-shirt.md";
  slug: "aime-leon-dore-striped-rugby-shirt";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"alessi-vite-espresso-maker.md": {
	id: "alessi-vite-espresso-maker.md";
  slug: "alessi-vite-espresso-maker";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"alfa-romeo-junior-veloce.md": {
	id: "alfa-romeo-junior-veloce.md";
  slug: "alfa-romeo-junior-veloce";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"anglepoise-type-75-mini.md": {
	id: "anglepoise-type-75-mini.md";
  slug: "anglepoise-type-75-mini";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"anish-kapoor-hayward-gallery-2026.md": {
	id: "anish-kapoor-hayward-gallery-2026.md";
  slug: "anish-kapoor-hayward-gallery-2026";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"arcteryx-beta-ar-2025.md": {
	id: "arcteryx-beta-ar-2025.md";
  slug: "arcteryx-beta-ar-2025";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ardnamurchan-ad-mezcal-cask-2025.md": {
	id: "ardnamurchan-ad-mezcal-cask-2025.md";
  slug: "ardnamurchan-ad-mezcal-cask-2025";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"arvo-part-tintinnabuli-ecm.md": {
	id: "arvo-part-tintinnabuli-ecm.md";
  slug: "arvo-part-tintinnabuli-ecm";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"asma-khan-monsoon.md": {
	id: "asma-khan-monsoon.md";
  slug: "asma-khan-monsoon";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"bang-olufsen-beosound-a5.md": {
	id: "bang-olufsen-beosound-a5.md";
  slug: "bang-olufsen-beosound-a5";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"baracuta-g9-harrington.md": {
	id: "baracuta-g9-harrington.md";
  slug: "baracuta-g9-harrington";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"barbour-beaufort-jacket.md": {
	id: "barbour-beaufort-jacket.md";
  slug: "barbour-beaufort-jacket";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"belazu-rose-harissa.md": {
	id: "belazu-rose-harissa.md";
  slug: "belazu-rose-harissa";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ben-geier-viewing-hours.md": {
	id: "ben-geier-viewing-hours.md";
  slug: "ben-geier-viewing-hours";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"benchmade-bugout-535.md": {
	id: "benchmade-bugout-535.md";
  slug: "benchmade-bugout-535";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"beyerdynamic-dt-770-pro.md": {
	id: "beyerdynamic-dt-770-pro.md";
  slug: "beyerdynamic-dt-770-pro";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"brompton-p-line-urban.md": {
	id: "brompton-p-line-urban.md";
  slug: "brompton-p-line-urban";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"bulleit-bourbon-mesquite-smoked-malt.md": {
	id: "bulleit-bourbon-mesquite-smoked-malt.md";
  slug: "bulleit-bourbon-mesquite-smoked-malt";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"canyon-grail-cfr-rift.md": {
	id: "canyon-grail-cfr-rift.md";
  slug: "canyon-grail-cfr-rift";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"casio-s100x-the-special-one.md": {
	id: "casio-s100x-the-special-one.md";
  slug: "casio-s100x-the-special-one";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"christopher-ward-c12-loco.md": {
	id: "christopher-ward-c12-loco.md";
  slug: "christopher-ward-c12-loco";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"christopher-ward-c63-sealander-true-gmt.md": {
	id: "christopher-ward-c63-sealander-true-gmt.md";
  slug: "christopher-ward-c63-sealander-true-gmt";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"cotswolds-field-to-cask-akeman-street-farm.md": {
	id: "cotswolds-field-to-cask-akeman-street-farm.md";
  slug: "cotswolds-field-to-cask-akeman-street-farm";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"craighill-temple-flashlight.md": {
	id: "craighill-temple-flashlight.md";
  slug: "craighill-temple-flashlight";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"creed-wild-vetiver.md": {
	id: "creed-wild-vetiver.md";
  slug: "creed-wild-vetiver";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"david-candaux-dc12-maverik.md": {
	id: "david-candaux-dc12-maverik.md";
  slug: "david-candaux-dc12-maverik";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"dieter-rams-less-but-better.md": {
	id: "dieter-rams-less-but-better.md";
  slug: "dieter-rams-less-but-better";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"dulcie-algae-plump-serum.md": {
	id: "dulcie-algae-plump-serum.md";
  slug: "dulcie-algae-plump-serum";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"engineered-garments-nanga-detachable-down-coat.md": {
	id: "engineered-garments-nanga-detachable-down-coat.md";
  slug: "engineered-garments-nanga-detachable-down-coat";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"fam-al-hut-mark-1-mobius.md": {
	id: "fam-al-hut-mark-1-mobius.md";
  slug: "fam-al-hut-mark-1-mobius";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"fellow-stagg-ekg-electric-kettle.md": {
	id: "fellow-stagg-ekg-electric-kettle.md";
  slug: "fellow-stagg-ekg-electric-kettle";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"fellow-stagg-ekg-kettle.md": {
	id: "fellow-stagg-ekg-kettle.md";
  slug: "fellow-stagg-ekg-kettle";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ferm-living-dedali-vase.md": {
	id: "ferm-living-dedali-vase.md";
  slug: "ferm-living-dedali-vase";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"filson-tin-cloth-tote.md": {
	id: "filson-tin-cloth-tote.md";
  slug: "filson-tin-cloth-tote";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"framework-laptop-16.md": {
	id: "framework-laptop-16.md";
  slug: "framework-laptop-16";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"fujifilm-x100vi.md": {
	id: "fujifilm-x100vi.md";
  slug: "fujifilm-x100vi";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"garmin-fenix-8-solar.md": {
	id: "garmin-fenix-8-solar.md";
  slug: "garmin-fenix-8-solar";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"grado-signature-s550.md": {
	id: "grado-signature-s550.md";
  slug: "grado-signature-s550";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"grand-seiko-slgb003-ice-forest.md": {
	id: "grand-seiko-slgb003-ice-forest.md";
  slug: "grand-seiko-slgb003-ice-forest";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"hal-fischer-seminal-works.md": {
	id: "hal-fischer-seminal-works.md";
  slug: "hal-fischer-seminal-works";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"hanhart-417-ti-desert-pilot.md": {
	id: "hanhart-417-ti-desert-pilot.md";
  slug: "hanhart-417-ti-desert-pilot";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"hay-parade-table-lamp.md": {
	id: "hay-parade-table-lamp.md";
  slug: "hay-parade-table-lamp";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"hilleberg-akto.md": {
	id: "hilleberg-akto.md";
  slug: "hilleberg-akto";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"hoto-pixeldrive-cordless-screwdriver.md": {
	id: "hoto-pixeldrive-cordless-screwdriver.md";
  slug: "hoto-pixeldrive-cordless-screwdriver";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"hyperlite-mountain-gear-unbound-2p.md": {
	id: "hyperlite-mountain-gear-unbound-2p.md";
  slug: "hyperlite-mountain-gear-unbound-2p";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"icehotel-jukkasjarvi.md": {
	id: "icehotel-jukkasjarvi.md";
  slug: "icehotel-jukkasjarvi";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ikea-varmblixt-sabine-marcelis.md": {
	id: "ikea-varmblixt-sabine-marcelis.md";
  slug: "ikea-varmblixt-sabine-marcelis";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"insta360-x5.md": {
	id: "insta360-x5.md";
  slug: "insta360-x5";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ixta-belfrage-fusao.md": {
	id: "ixta-belfrage-fusao.md";
  slug: "ixta-belfrage-fusao";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"james-percival-everett.md": {
	id: "james-percival-everett.md";
  slug: "james-percival-everett";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"kestin-crammond-shirt.md": {
	id: "kestin-crammond-shirt.md";
  slug: "kestin-crammond-shirt";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"kilchoman-maury-cask-matured-2026.md": {
	id: "kilchoman-maury-cask-matured-2026.md";
  slug: "kilchoman-maury-cask-matured-2026";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"laifen-t1-pro.md": {
	id: "laifen-t1-pro.md";
  slug: "laifen-t1-pro";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"lamy-2000-fountain-pen.md": {
	id: "lamy-2000-fountain-pen.md";
  slug: "lamy-2000-fountain-pen";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"leatherman-free-p4-multitool.md": {
	id: "leatherman-free-p4-multitool.md";
  slug: "leatherman-free-p4-multitool";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"leatherman-skeletool.md": {
	id: "leatherman-skeletool.md";
  slug: "leatherman-skeletool";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"leatherman-wave-alpha.md": {
	id: "leatherman-wave-alpha.md";
  slug: "leatherman-wave-alpha";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"leatherman-wave-plus.md": {
	id: "leatherman-wave-plus.md";
  slug: "leatherman-wave-plus";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"leica-q3-43.md": {
	id: "leica-q3-43.md";
  slug: "leica-q3-43";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"leki-micro-vario-carbon-trekking-poles.md": {
	id: "leki-micro-vario-carbon-trekking-poles.md";
  slug: "leki-micro-vario-carbon-trekking-poles";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"loewe-essential-loewe-homme.md": {
	id: "loewe-essential-loewe-homme.md";
  slug: "loewe-essential-loewe-homme";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"lomography-lomo-mc-a.md": {
	id: "lomography-lomo-mc-a.md";
  slug: "lomography-lomo-mc-a";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"longines-spirit-zulu-time-1925-edition.md": {
	id: "longines-spirit-zulu-time-1925-edition.md";
  slug: "longines-spirit-zulu-time-1925-edition";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"louis-poulsen-rumee-220.md": {
	id: "louis-poulsen-rumee-220.md";
  slug: "louis-poulsen-rumee-220";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"matfer-bourgeat-carbon-steel-pan.md": {
	id: "matfer-bourgeat-carbon-steel-pan.md";
  slug: "matfer-bourgeat-carbon-steel-pan";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"merz-b-schwanen-346-sweatshirt.md": {
	id: "merz-b-schwanen-346-sweatshirt.md";
  slug: "merz-b-schwanen-346-sweatshirt";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"micil-earls-island-single-pot-still.md": {
	id: "micil-earls-island-single-pot-still.md";
  slug: "micil-earls-island-single-pot-still";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"mickey-17-jung-jae-il-ost.md": {
	id: "mickey-17-jung-jae-il-ost.md";
  slug: "mickey-17-jung-jae-il-ost";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ming-57-04-phoenix.md": {
	id: "ming-57-04-phoenix.md";
  slug: "ming-57-04-phoenix";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"moccamaster-kbgv-select.md": {
	id: "moccamaster-kbgv-select.md";
  slug: "moccamaster-kbgv-select";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"monocle-travel-bag-23.md": {
	id: "monocle-travel-bag-23.md";
  slug: "monocle-travel-bag-23";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"moots-scrambler.md": {
	id: "moots-scrambler.md";
  slug: "moots-scrambler";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"nemo-dagger-osmo-2p.md": {
	id: "nemo-dagger-osmo-2p.md";
  slug: "nemo-dagger-osmo-2p";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"nomos-club-campus-38.md": {
	id: "nomos-club-campus-38.md";
  slug: "nomos-club-campus-38";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"orvis-heritage-waxed-canvas-jacket.md": {
	id: "orvis-heritage-waxed-canvas-jacket.md";
  slug: "orvis-heritage-waxed-canvas-jacket";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"osprey-aether-65.md": {
	id: "osprey-aether-65.md";
  slug: "osprey-aether-65";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"osprey-aether-plus-60.md": {
	id: "osprey-aether-plus-60.md";
  slug: "osprey-aether-plus-60";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"patagonia-campo-hip-pack.md": {
	id: "patagonia-campo-hip-pack.md";
  slug: "patagonia-campo-hip-pack";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"patagonia-nine-trails-pack-20l.md": {
	id: "patagonia-nine-trails-pack-20l.md";
  slug: "patagonia-nine-trails-pack-20l";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"penfield-50th-anniversary-kasson.md": {
	id: "penfield-50th-anniversary-kasson.md";
  slug: "penfield-50th-anniversary-kasson";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"pentax-17-film-camera.md": {
	id: "pentax-17-film-camera.md";
  slug: "pentax-17-film-camera";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"porlex-mini-ii-coffee-grinder.md": {
	id: "porlex-mini-ii-coffee-grinder.md";
  slug: "porlex-mini-ii-coffee-grinder";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"porsche-911-st.md": {
	id: "porsche-911-st.md";
  slug: "porsche-911-st";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"private-white-vc-ventile-harrington.md": {
	id: "private-white-vc-ventile-harrington.md";
  slug: "private-white-vc-ventile-harrington";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"project-hail-mary.md": {
	id: "project-hail-mary.md";
  slug: "project-hail-mary";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"red-wing-iron-ranger-boots.md": {
	id: "red-wing-iron-ranger-boots.md";
  slug: "red-wing-iron-ranger-boots";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"remarkable-paper-pro.md": {
	id: "remarkable-paper-pro.md";
  slug: "remarkable-paper-pro";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"royal-enfield-flying-flea-c6.md": {
	id: "royal-enfield-flying-flea-c6.md";
  slug: "royal-enfield-flying-flea-c6";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"sami-tamimi-boustany.md": {
	id: "sami-tamimi-boustany.md";
  slug: "sami-tamimi-boustany";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"seiko-prospex-1965-heritage-60th-anniversary.md": {
	id: "seiko-prospex-1965-heritage-60th-anniversary.md";
  slug: "seiko-prospex-1965-heritage-60th-anniversary";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"shokz-openfit-air.md": {
	id: "shokz-openfit-air.md";
  slug: "shokz-openfit-air";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"sigma-bf.md": {
	id: "sigma-bf.md";
  slug: "sigma-bf";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"snow-peak-titanium-double-wall-mug.md": {
	id: "snow-peak-titanium-double-wall-mug.md";
  slug: "snow-peak-titanium-double-wall-mug";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"sony-ps-lx3bt-turntable.md": {
	id: "sony-ps-lx3bt-turntable.md";
  slug: "sony-ps-lx3bt-turntable";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"sony-wh-1000xm6.md": {
	id: "sony-wh-1000xm6.md";
  slug: "sony-wh-1000xm6";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"springbank-hand-filled-2026.md": {
	id: "springbank-hand-filled-2026.md";
  slug: "springbank-hand-filled-2026";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"tag-heuer-carrera-seafarer.md": {
	id: "tag-heuer-carrera-seafarer.md";
  slug: "tag-heuer-carrera-seafarer";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"technics-sl-1200m7ald-aime-leon-dore.md": {
	id: "technics-sl-1200m7ald-aime-leon-dore.md";
  slug: "technics-sl-1200m7ald-aime-leon-dore";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"teenage-engineering-ep-133-ko-ii.md": {
	id: "teenage-engineering-ep-133-ko-ii.md";
  slug: "teenage-engineering-ep-133-ko-ii";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"teenage-engineering-tx-6.md": {
	id: "teenage-engineering-tx-6.md";
  slug: "teenage-engineering-tx-6";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"tobermory-1996-29-year-old.md": {
	id: "tobermory-1996-29-year-old.md";
  slug: "tobermory-1996-29-year-old";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"tudor-black-bay-58-burgundy.md": {
	id: "tudor-black-bay-58-burgundy.md";
  slug: "tudor-black-bay-58-burgundy";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ugmonk-analog-starter-kit.md": {
	id: "ugmonk-analog-starter-kit.md";
  slug: "ugmonk-analog-starter-kit";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"union-hand-roasted-ground-espresso.md": {
	id: "union-hand-roasted-ground-espresso.md";
  slug: "union-hand-roasted-ground-espresso";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"util-kgt-box.md": {
	id: "util-kgt-box.md";
  slug: "util-kgt-box";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"victorinox-farmer-x-alox.md": {
	id: "victorinox-farmer-x-alox.md";
  slug: "victorinox-farmer-x-alox";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"vitra-antony-chair-2025.md": {
	id: "vitra-antony-chair-2025.md";
  slug: "vitra-antony-chair-2025";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"weiss-standard-issue-field-watch.md": {
	id: "weiss-standard-issue-field-watch.md";
  slug: "weiss-standard-issue-field-watch";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"white-peak-wire-works-bourbon-barrel.md": {
	id: "white-peak-wire-works-bourbon-barrel.md";
  slug: "white-peak-wire-works-bourbon-barrel";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"zed-nelson-anthropocene-illusion.md": {
	id: "zed-nelson-anthropocene-illusion.md";
  slug: "zed-nelson-anthropocene-illusion";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
};
"looks": {
"the-weekender.md": {
	id: "the-weekender.md";
  slug: "the-weekender";
  body: string;
  collection: "looks";
  data: InferEntrySchema<"looks">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
