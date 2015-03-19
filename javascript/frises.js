var FrisesCreator = function(frises, periodes, evenements, annee_debut, annee_fin) {
	// Données d'entrée 
	this.frises = frises;
	this.periodes = periodes;
	this.evenements = evenements;
	this.annee_debut = annee_debut;
	this.annee_fin = annee_fin;

	// Paramètres graphiques
	this.marge_haut_svg = 50;
	this.marge_droite_svg = 15;
	this.marge_bas_svg = 15;
	this.marge_gauche_svg = 300;

	this.hauteur_frise = 100;

	this.largeur_svg = 4000 - this.marge_droite_svg - this.marge_gauche_svg;
	this.hauteur_svg = 800 - this.marge_haut_svg - this.marge_bas_svg;
}

FrisesCreator.prototype.calculerEchelle = function(nombre_de_frises) {
	//scales
	this.x = d3.scale.linear()
			.domain([this.annee_debut, this.annee_fin])
			.range([0, this.largeur_svg]);
	this.x1 = d3.scale.linear()
			.range([0, this.largeur_svg]);
	this.y1 = d3.scale.linear()
			.domain([0, nombre_de_frises])
			.range([0, this.hauteur_svg]);

	this.y2 = d3.scale.linear()
				.domain([0, nombre_de_frises])
				.range([0, this.hauteur_frise*nombre_de_frises]); 
}

FrisesCreator.prototype.construireFrises = function( ) {

}

FrisesCreator.prototype.construireFrises = function( ) {
	var nombre_de_frises = this.frises.length;

	this.calculerEchelle(nombre_de_frises);

	this.chart = d3.select("#conteneur-frises")
				.append("svg")
				.attr("width", this.largeur_svg + this.marge_droite_svg + this.marge_gauche_svg)
				.attr("height", this.hauteur_svg + this.marge_haut_svg + this.marge_bas_svg)
				.attr("class", "chart");
	
	this.chart.append("defs").append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("width", this.largeur_svg)
		.attr("height", this.hauteur_svg);

	this.main = this.chart.append("g")
				.attr("transform", "translate(" + this.marge_gauche_svg + "," + this.marge_haut_svg + ")")
				.attr("width", this.largeur_svg)
				.attr("height", this.hauteur_svg)
				.attr("class", "main");
	
	//main lanes and texts
	this.main.append("g").selectAll(".laneLines")
		.data(this.periodes)
		.enter().append("line")
		.attr("x1", this.marge_droite_svg)
		.attr("y1", (d) => {return this.y1(d.friseId);})
		.attr("x2", this.largeur_svg)
		.attr("y2", (d) => {return this.y1(d.friseId);})
		.attr("stroke", "lightgray")

	this.main.append("g").selectAll(".titre-frise")
		.data(this.frises)
		.enter().append("text")
		.text((d) => {return d;})
		.attr("x", -this.marge_droite_svg)
		.attr("y", (d, i) => {return this.y2(i + .5);})
		.attr("dy", ".5ex")
		.attr("text-anchor", "end")
		.attr("class", "titre-frise");

	this.itemRects = this.main.append("g")
						.attr("clip-path", "url(#clip)");

	this.display();
}
		
FrisesCreator.prototype.display = function () {
	var minExtent = 0;
	var maxExtent = 2000;

	this.x1.domain([minExtent, maxExtent]);

	this.majRectanglesPeriodes();
	this.majEtiquettesPeriodes(minExtent, maxExtent);


}

FrisesCreator.prototype.majRectanglesPeriodes = function () {
	var rects;

	rects = this.itemRects.selectAll("rect")
	        .data(periodes, (d) => { return d.nom; })
		.attr("x", (d) => {return this.x1(d.anneeDepart);})
		.attr("width", (d) => {return this.x1(d.anneeFin) - this.x1(d.anneeDepart);});
	
	rects.enter().append("rect")
		.attr("class", (d) => {return "miniItem" + d.friseId;})
		.attr("x", (d) => {return this.x1(d.anneeDepart);})
		.attr("y", (d) => {return this.y1(d.friseId) + 10;})
		.attr("width", (d) => {return this.x1(d.anneeFin) - this.x1(d.anneeDepart);})
		.attr("height", (d) => {return .8 * this.y1(1);});

		rects.exit().remove();
}

FrisesCreator.prototype.majEtiquettesPeriodes = function (minExtent, maxExtent) {
	var labels;

	labels = this.itemRects.selectAll("text")
		.data(periodes, (d) => { return d.nom; })
		.attr("x", (d) => {return this.x1(Math.max(d.anneeDepart, minExtent) 
			+ ( ( Math.min(d.anneeFin, maxExtent) - Math.max(d.anneeDepart, minExtent))/2 )
			);});

	labels.enter().append("text")
		.text((d) => {return d.nom;})
		.attr("x", (d) => {return this.x1(Math.max(d.anneeDepart, minExtent));})
		.attr("y", (d) => {return this.y1(d.friseId + .5);})
		.attr("text-anchor", "start");

	labels.exit().remove();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Debut code au chargement de la page
var frises;
var periodes;
var annee_debut = 0;
var annee_fin = 2000;

var frisesCreator;

// Les appels a d3.json sont asynchrones, on est donc obligé de passer par cette série de callbacks pour attendre le chargement.
d3.json("./donnees/frises.json", function(json) {
	frises = json;
	d3.json("./donnees/periodes.json", function(json) {
		periodes = json;
		frisesCreator = new FrisesCreator(frises, periodes, null, annee_debut, annee_fin);
		frisesCreator.construireFrises();
	} );
} );