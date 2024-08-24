import React from 'react'

const Result = ({result}) => {
  return (
    <div className="outline-dashed relative *:py-1 text-center outline-1 sm:mx-auto sm:max-w-3xl mx-12 rounded p-4 my-10">
      {result && (
        <div className="">
          <p className="text-2xl font-bold text-purple-600">{result}</p>
        </div>
      )}
      <p className="text-green-400">
        Current Tokens :<strong className="ml-6"> $ 200</strong>
      </p>
    </div>
  );
}

export default Result
