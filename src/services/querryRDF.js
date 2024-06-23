// c:\Users\Dio\OneDrive\Documents\Web Project\web_semantic\diet_semantic_web\src\services\querryRDF.js

// Define your queries as constants
const queryBahanDarihewan = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type makanan_diet:darihewan .
    }
`;

const queryBahanDariTumbuhan = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type makanan_diet:dariTumbuhan .
    }
`;
const queryBahanPokok = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type makanan_diet:pokok .
    }
`;
const queryHidanganUtama = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type md:hidanganaUtama
    }
`;

// Export an object containing your queries
export const queries = {
    bahanDarihewan: queryBahanDarihewan,
    bahanDaritumbuhan: queryBahanDariTumbuhan,
    bahanPokok: queryBahanPokok,
    hidanganUtama: queryHidanganUtama,
    // Add more queries as needed
};
