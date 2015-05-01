(function () {
    "use strict";
    var frises, periodes, evenements, annee_debut, annee_fin, FrisesCreator, frisesCreator;

    FrisesCreator = function (frises, periodes, evenements, annee_debut, annee_fin) {
        // Données d'entrée 
        this.frises = frises;
        this.periodes = periodes;
        this.evenements = evenements;
        this.annee_debut = annee_debut;
        this.annee_fin = annee_fin;

        // Paramètres graphiques
        this.marge_haut_svg = 150;
        this.marge_droite_svg = 15;
        this.marge_bas_svg = 15;
        this.marge_gauche_svg = 450;
        this.hauteur_frise = 100;
        this.largeur_svg = 36000 - this.marge_droite_svg - this.marge_gauche_svg;
        this.hauteur_svg = 800 - this.marge_haut_svg - this.marge_bas_svg;
    };

    FrisesCreator.prototype.calculerEchelle = function (nombre_de_frises) {
        //Echelles
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
            .range([0, this.hauteur_frise * nombre_de_frises]);
    };

    FrisesCreator.prototype.construireFrises = function () {
        var self, nombre_de_frises;
        self = this;
        nombre_de_frises = this.frises.length;

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
            .data(this.frises)
            .enter().append("line")
            .attr("x1", this.marge_droite_svg)
            .attr("x2", this.largeur_svg)
            .attr("y1", function (d) {return self.y1(d.id) + 10; })
            .attr("y2", function (d) {return self.y1(d.id) + 10; })
            .attr("class", "ligne-separation-frises");

        this.main.append("g").selectAll(".titre-frise")
            .data(this.frises)
            .enter().append("text")
            .text(function (d) {return d.libelle; })
            .attr("x", -this.marge_droite_svg)
            .attr("y", function (d, i) {return self.y2(i + 0.5); })
            .attr("dy", ".5ex")
            .attr("text-anchor", "end")
            .attr("class", "titre-frise");

        this.itemRects = this.main.append("g")
            .attr("clip-path", "url(#clip)");

        this.vignettesEvenements = this.main.append("g")
            .attr("class", "vignette-evenement");
        
        this.display();
    };

    FrisesCreator.prototype.display = function () {
        var minExtent, maxExtent;

        minExtent = 1400;
        maxExtent = 2000;

        this.x1.domain([minExtent, maxExtent]);
        this.majRectanglesPeriodes();
        this.majEtiquettesPeriodes(minExtent, maxExtent);
        this.majEtiquettesEvenements(minExtent, maxExtent);
        
    };

    FrisesCreator.prototype.majRectanglesPeriodes = function () {
        var self, rects;
        self = this;

        rects = this.itemRects.selectAll("rect")
            .data(periodes, function (d) { return d.nom; })
            .attr("x", function (d) {return self.x1(d.anneeDepart); })
            .attr("width", function (d) {return self.x1(d.anneeFin) - self.x1(d.anneeDepart); });

        rects.enter().append("rect")
            .attr("class", function (d) {return "miniItem" + d.friseId; })
            .attr("x", function (d) {return self.x1(d.anneeDepart); })
            .attr("y", function (d) {return self.y1(d.friseId) + 10; })
            .attr("width", function (d) {return self.x1(d.anneeFin) - self.x1(d.anneeDepart); })
            .attr("height", function (d) {return 0.8 * self.y1(1); });

        rects.exit().remove();
    };

    FrisesCreator.prototype.majEtiquettesPeriodes = function (minExtent, maxExtent) {
        var self, labels;
        self = this;

        labels = this.itemRects.selectAll("text")
            .data(periodes, function (d) { return d.nom; })
            .attr("x", function (d) {return this.x1(Math.max(d.anneeDepart, minExtent)
                                                    + ((Math.min(d.anneeFin, maxExtent) - Math.max(d.anneeDepart, minExtent))  / 2)
                                                   ); });
        labels.enter().append("text")
            .text(function (d) {return d.nom; })
            .attr("x", function (d) {return self.x1(Math.max(d.anneeDepart, minExtent)); })
            .attr("y", function (d) {return self.y1(d.friseId + 0.5); })
            .attr("text-anchor", "start");
        labels.exit().remove();
    };

    FrisesCreator.prototype.majEtiquettesEvenements = function (minExtent, maxExtent) {
        var self, labels;
        self = this;
        labels = this.vignettesEvenements.selectAll("text")
            .data(evenements, function (d) { return d.nom; })
            .attr("x", function (d) {return this.x1(d.anneeOccurence
                                                   ); });
        labels.enter().append("text")
            .text(function (d) {return d.nom; })
            .attr("x", function (d) {return self.x1(d.anneeOccurence); })
            .attr("y", function (d) {return self.y1(d.friseId + 0.25); })
            .attr("text-anchor", "start");
        labels.exit().remove();
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Debut code au chargement de la page
    annee_debut = 1350;
    annee_fin = 2000;

    // Les appels a d3.json sont asynchrones, on est donc obligé de passer par cette série de callbacks pour attendre le chargement.
    d3.json("../donnees/frises.json", function (json) {
        frises = json;
        d3.json("../donnees/periodes.json", function (json) {
            periodes = json;
            d3.json("../donnees/evenements.json", function (json) {
                evenements = json;
                frisesCreator = new FrisesCreator(frises, periodes, evenements, annee_debut, annee_fin);
                frisesCreator.construireFrises();
            });
        });
    });

}());