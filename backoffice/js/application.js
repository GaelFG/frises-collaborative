// Prototype crade
var angular;
var application = angular.module('adminFrisesInteractives', ['ui.bootstrap']);

application.controller('ControleurAdministration', ['$scope', '$modal', function ($scope, $modal) {
    "use strict";

    $scope.listeFrises = [
        {"id": 0, "nom": "Evolutions techniques et technologiques"},
        {"id": 1, "nom": "Histoire du design"},
        {"id": 2, "nom": "Histoire de l'art"}
    ];
    $scope.listeEvenements = [
        {"friseId": 0, "nom": "mettre ici le nom", "anneeOccurence": 2015, "dateEventuelle": "15 Janvier", "descriptionCourte": "blabla"},
        {"friseId": 0, "nom": "mettre ici le nom", "anneeOccurence": 2015, "dateEventuelle": "15 Janvier", "descriptionCourte": "blabla"},
        {"friseId": 0, "nom": "mettre ici le nom", "anneeOccurence": 2015, "dateEventuelle": "15 Janvier", "descriptionCourte": "blabla"}
    ];
    $scope.listePeriodes = [
        {"friseId": 0, "nom": "Qin", "anneeDepart": 5, "anneeFin": 265},
        {"friseId": 0, "nom": "Jin", "anneeDepart": 265, "anneeFin": 420},
        {"friseId": 0, "nom": "Sui", "anneeDepart": 580, "anneeFin": 615},
        {"friseId": 0, "nom": "Tang", "anneeDepart": 620, "anneeFin": 900},
        {"friseId": 0, "nom": "Song", "anneeDepart": 960, "anneeFin": 1265},
        {"friseId": 0, "nom": "Yuan", "anneeDepart": 1270, "anneeFin": 1365},
        {"friseId": 0, "nom": "Ming", "anneeDepart": 1370, "anneeFin": 1640},
        {"friseId": 0, "nom": "Qing", "anneeDepart": 1645, "anneeFin": 1910},
        {"friseId": 1, "nom": "Yamato", "anneeDepart": 300, "anneeFin": 530},
        {"friseId": 1, "nom": "Asuka", "anneeDepart": 550, "anneeFin": 700},
        {"friseId": 1, "nom": "Nara", "anneeDepart": 710, "anneeFin": 790},
        {"friseId": 1, "nom": "Heian", "anneeDepart": 800, "anneeFin": 1180},
        {"friseId": 1, "nom": "Kamakura", "anneeDepart": 1190, "anneeFin": 1330},
        {"friseId": 1, "nom": "Muromachi", "anneeDepart": 1340, "anneeFin": 1560},
        {"friseId": 1, "nom": "Edo", "anneeDepart": 1610, "anneeFin": 1860},
        {"friseId": 1, "nom": "Meiji", "anneeDepart": 1870, "anneeFin": 1900},
        {"friseId": 1, "nom": "Taisho", "anneeDepart": 1910, "anneeFin": 1920},
        {"friseId": 1, "nom": "Showa", "anneeDepart": 1925, "anneeFin": 1985},
        {"friseId": 1, "nom": "Heisei", "anneeDepart": 1990, "anneeFin": 1995},
        {"friseId": 2, "nom": "Three Kingdoms", "anneeDepart": 10, "anneeFin": 670},
        {"friseId": 2, "nom": "North and South States", "anneeDepart": 690, "anneeFin": 900},
        {"friseId": 2, "nom": "Goryeo", "anneeDepart": 920, "anneeFin": 1380},
        {"friseId": 2, "nom": "Joseon", "anneeDepart": 1390, "anneeFin": 1890},
        {"friseId": 2, "nom": "Korean Empire", "anneeDepart": 1900, "anneeFin": 1945}
    ];
    
    // Selection
    $scope.friseSelectionee = {friseId: -1};
    
    $scope.selectionnerFrise = function (idfrise) {
        $scope.friseSelectionee.friseId = idfrise;
    };
    
    // Ajout 
    $scope.ajouterTruc = function () {
        $scope.truc.push($scope.trucEncours);
    };

    // Suppression frise
    $scope.effacerFrise = function ($event, frise) {
        $event.stopPropagation();
        $scope.listeFrises.splice($scope.listeFrises.indexOf(frise), 1);
    };
    // Suppression periode
    $scope.effacerPeriode = function (periode) {
        $scope.listePeriodes.splice($scope.listePeriodes.indexOf(periode), 1);
    };
    // Suppression evenement
    $scope.effacerEvenement = function (evenement) {
        $scope.listeEvenements.splice($scope.listePeriodes.indexOf(evenement), 1);
    };
    
    // Renommage frise
    $scope.renommerFrise = function ($event, frise) {
        $event.stopPropagation();
    };

}]);



