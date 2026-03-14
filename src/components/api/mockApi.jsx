// Mock API layer simulating AWS backend (API Gateway + Lambda + DynamoDB + S3)
// Replace these functions with real fetch() calls to your API Gateway endpoints

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let mockMedications = [
  { id: "med_1", name: "Lisinopril", dosage: 10, frequency: "daily", addedAt: "2026-03-10" },
  { id: "med_2", name: "Metformin", dosage: 500, frequency: "twice_daily", addedAt: "2026-03-08" },
  { id: "med_3", name: "Atorvastatin", dosage: 20, frequency: "daily", addedAt: "2026-03-01" },
];

// POST /presigned-upload
export async function getPresignedUploadUrl() {
  await delay(500);
  // In production: returns { uploadUrl, objectKey } from API Gateway
  return {
    uploadUrl: "https://s3.amazonaws.com/mock-bucket/mock-presigned-url",
    objectKey: `uploads/${Date.now()}_photo.jpg`,
  };
}

// Upload to S3 using presigned URL
export async function uploadToS3(presignedUrl, imageBlob) {
  await delay(800);
  // In production: PUT to presignedUrl with imageBlob body
  // await fetch(presignedUrl, { method: 'PUT', body: imageBlob, headers: { 'Content-Type': 'image/jpeg' } });
  return true;
}

// POST /analyze-photo
export async function analyzePhoto(objectKey) {
  await delay(3200); // Simulate 3-4 second processing
  // In production: POST to API Gateway with { objectKey }
  return {
    detectedDrug: "Amoxicillin 500mg",
    summary:
      "Amoxicillin is a penicillin-type antibiotic used to treat a wide variety of bacterial infections. It works by stopping the growth of bacteria. This medication is commonly prescribed for ear infections, pneumonia, skin infections, and urinary tract infections.",
    interactions: [
      {
        medication: "Metformin 500mg",
        severity: "low",
        description:
          "Amoxicillin may slightly reduce the effectiveness of Metformin. Monitor blood sugar levels more closely while taking both medications.",
      },
      {
        medication: "Warfarin",
        severity: "high",
        description:
          "Amoxicillin can significantly increase the anticoagulant effect of Warfarin, raising the risk of bleeding. INR monitoring is strongly recommended.",
      },
    ],
    hasDangerousInteraction: true,
  };
}

// GET /medications
export async function getMedications() {
  await delay(400);
  return [...mockMedications];
}

// POST /medications
export async function addMedication(name, dosage, frequency) {
  await delay(300);
  const newMed = {
    id: `med_${Date.now()}`,
    name,
    dosage,
    frequency,
    addedAt: new Date().toISOString().split("T")[0],
  };
  mockMedications.push(newMed);
  return newMed;
}

// DELETE /medications/{id}
export async function deleteMedication(id) {
  await delay(300);
  mockMedications = mockMedications.filter((m) => m.id !== id);
  return true;
}