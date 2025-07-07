import RegisterForm from './RegisterForm';

const planDetails = {
  trial: {
    name: 'Trial Plan',
    price: 19,
    duration: '2 weeks',
  },
  monthly: {
    name: 'Monthly Plan',
    price: 299,
    duration: '1 month',
  },
  quarterly: {
    name: 'Quarterly Plan',
    price: 699,
    duration: '3 months',
  },
};

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { plan: string };
}) {
  const selectedPlan = planDetails[searchParams.plan as keyof typeof planDetails] || planDetails.monthly;

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
          <p className="mt-2 text-gray-300">
            {selectedPlan.name} - ${selectedPlan.price}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Duration: {selectedPlan.duration}
          </p>
        </div>

        <div className="bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10">
          <RegisterForm plan={searchParams.plan} planDetails={selectedPlan} />
        </div>
      </div>
    </main>
  );
} 