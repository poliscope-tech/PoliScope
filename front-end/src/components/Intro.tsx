import React from 'react';

type IntroProps = {
  avatarIndex: number;
};

export function Intro({ avatarIndex }: IntroProps) {
  switch (avatarIndex) {
    case 0:
      return <Intro1 />;
    case 1:
      return <Intro2 />;
    case 2:
      return <Intro3 />;
    case 3:
      return <Intro4 />;
    default:
      return <Intro1 />;
  }
}

function Intro1() {
  return (
    <>
      <h1 className="tight mt-10 font-display text-4xl font-light text-white">
        <span className="text-sky-300">Board of Supervisors</span>
        <br />
        Dean Preston <br />
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300">
        Supervisor Dean Preston of SF&apos;s District 5 is a Democratic
        Socialist and tenant rights attorney. With 20 years in the affordable
        housing movement, he fought for rent control, formed a tenant rights
        group, and authored a law for tenant legal representation. He champions
        community engagement, supports small businesses, and seeks systemic
        change.
      </p>
    </>
  );
}

function Intro2() {
  return (
    <>
      <h1 className="tight mt-10 font-display text-4xl font-light text-white">
        <span className="text-sky-300">Board of Supervisors</span>
        <br />
        Aaron Peskin <br />
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300">
        Supervisor Aaron Peskin of SF&apos;s District 3 is the President of the Board of Supervisors and a champion of affordable housing and environmental sustainability. Representing areas like North Beach and Chinatown, he&apos;s served five terms, including two prior stints as Board President. Peskin co-authored SF&apos;s first inclusionary housing law, leading efforts to expand affordable housing. He also advocates for waterfront protections and conservation. Peskin serves on the Land Use and Transportation Committee and holds roles on the Bay Conservation &amp; Development Commission and the San Francisco Bay Restoration Authority.
      </p>
    </>
  );
}

function Intro3() {
  return (
    <>
      <h1 className="tight mt-10 font-display text-4xl font-light text-white">
        <span className="text-sky-300">Board of Supervisors</span>
        <br />
        Myrna Melgar <br />
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300">
        Supervisor Myrna Melgar of SF&apos;s District 7 was elected in 2020, succeeding Norman Yee. She chairs the Land Use and Transportation Committee and serves on various committees, including Youth, Young Adult, and Families. Melgar is also a Commissioner for the County Transportation Authority and Bay Area Air Quality District. She has supported the expansion of the &apos;Free Muni for Youth&apos; program. In housing, she made headlines by voting against a 495-unit apartment project, sparking a state investigation, and opposed restrictive housing legislation in the Northern Waterfront area.
      </p>
    </>
  );
}

function Intro4() {
  return (
    <>
      <h1 className="tight mt-10 font-display text-4xl font-light text-white">
        <span className="text-sky-300">Board of Supervisors</span>
        <br />
        Hillary Ronen <br />
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300">
        Supervisor Hillary Ronen of SF&apos;s District 9 is a former immigrant rights attorney who helped pass California&apos;s Domestic Workers&apos; Bill of Rights. Elected in 2016, she champions affordable housing and mental health reform. Ronen co-authored the Student Success Fund, securing $60 million annually for educational support. She&apos;s known for her housing policies, including opposition to certain developments and tenant protections. Ronen also advocates for public safety reform, proposing budget cuts to the SFPD and expanding mental health services. Her work emphasizes community support, equity, and addressing systemic issues.
      </p>
    </>
  );
}