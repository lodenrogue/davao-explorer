const DAVAO_BOUNDS = [
    [125.35, 6.95],
    [125.85, 7.25]
];

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    center: [125.6128, 7.0731],
    zoom: 13,
    maxBounds: DAVAO_BOUNDS
});

map.on('load', () => {
    const geojson = {
	type: 'FeatureCollection',
	features: LOCATIONS.map(loc => ({
	    type: 'Feature',
	    geometry: {
		type: 'Point',
		coordinates: [loc.lng, loc.lat]
	    },
	    properties: {
		...loc,
		tips: JSON.stringify(loc.tips),
		ratings: JSON.stringify(loc.ratings),
		color: CATEGORY_COLORS[loc.category]
	    }
	}))
    };

    map.addSource('places', {
	type: 'geojson',
	data: geojson
    });

    map.addLayer({
	id: 'nodes',
	type: 'circle',
	source: 'places',
	paint: {
	    'circle-radius': 10,
	    'circle-color': ['get', 'color'],
	    'circle-stroke-width': 2,
	    'circle-stroke-color': '#ffffff'
	}
    });

    map.addLayer({
	id: 'node-labels',
	type: 'symbol',
	source: 'places',
	layout: {
	    'text-field': ['get', 'name'],
	    'text-font': ['Open Sans Bold'],
	    'text-size': 12,
	    'text-offset': [0, -1.8],
	    'text-anchor': 'bottom'
	},
	paint: {
	    'text-color': '#ffffff',
	    'text-halo-color': 'rgba(0,0,0,0.8)',
	    'text-halo-width': 1.5
	}
    });

    map.on('click', 'nodes', (e) => {
	const props = e.features[0].properties;

	openPopup({
	    ...props,
	    tips: JSON.parse(props.tips),
	    ratings: JSON.parse(props.ratings)
	});

	map.flyTo({
	    center: e.features[0].geometry.coordinates,
	    zoom: 15
	});
    });

    map.on('mouseenter', 'nodes', () => {
	map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'nodes', () => {
	map.getCanvas().style.cursor = '';
    });
});
