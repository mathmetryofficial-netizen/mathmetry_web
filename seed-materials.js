// Native fetch is available in Node 18+

const materials = [
    {
        title: "Algebra Basics",
        description: "Introduction to Algebra",
        subject: "Mathematics",
        classLevel: "8",
        board: "CBSE",
        chapter: "Algebra",
        fileUrl: "https://example.com/algebra.pdf",
        materialType: "pdf",
        price: 99
    },
    {
        title: "Geometry Formulas",
        description: "Important formulas",
        subject: "Mathematics",
        classLevel: "8",
        board: "CBSE",
        chapter: "Geometry",
        fileUrl: "https://example.com/geo.pdf",
        materialType: "pdf",
        price: 49
    },
    {
        title: "Number System Notes",
        description: "Detailed notes",
        subject: "Mathematics",
        classLevel: "9",
        board: "ICSE",
        chapter: "Number System",
        fileUrl: "https://example.com/ns.pdf",
        materialType: "text",
        price: 0
    }
];

async function seed() {
    console.log('Seeding materials...');
    for (const m of materials) {
        try {
            const res = await fetch('http://localhost:3000/api/admin/materials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(m)
            });
            const data = await res.json();
            console.log('Added:', m.title, data);
        } catch (e) {
            console.error('Error adding:', m.title, e.message);
        }
    }
}

seed();
