'use client';

export function MLflowTab() {
  const mlflowUrl = "http://10.151.4.91:5000/#/experiments/";

  return (
    <div className="w-full h-[80vh]">
      <iframe
        src={mlflowUrl}
        title="MLflow UI"
        className="w-full h-full border-0"
      />
    </div>
  );
}
