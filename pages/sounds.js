import React from "react";
import styled, { withTheme } from "styled-components";

import Layout from "../components/Layout";

import sounds from "../data/sounds.json";

const SCTrack = withTheme(({ url, theme }) =>
  <iframe
    width="100%"
    height="166"
    scrolling="no"
    frameBorder="no"
    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
      url
    )}&amp;color=${theme.colors.blue.replace(
      "#",
      ""
    )}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false`}
  />
);

const SCUser = withTheme(({ url, theme }) =>
  <iframe
    width="100%"
    height="450"
    scrolling="no"
    frameBorder="no"
    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
      url
    )}&amp;color=${theme.colors.blue.replace(
      "#",
      ""
    )}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`}
  />
);

const chooseSoundEmbed = sound => {
  switch (sound.kind) {
    case "user":
      return <SCUser url={sound.uri} />;
    default:
      return <SCTrack url={sound.uri} />;
  }
};

const SoundcloudEmbed = styled(({ sound, className }) =>
  <div className={className}>
    {chooseSoundEmbed(sound)}
  </div>
)`
  margin-bottom: ${p => p.theme.space(2)}
`;

export default () =>
  <Layout title="Sounds">
    {sounds.map(sound => <SoundcloudEmbed key={sound.id} sound={sound} />)}
  </Layout>;
