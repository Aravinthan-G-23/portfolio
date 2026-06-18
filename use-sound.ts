import { useCallback, useState } from "react";

export function useSound() {
  const [muted] = useState<boolean>(true);

  const toggleSoundMute = useCallback(() => {
    // Sound disabled
  }, []);

  const playHover = useCallback(() => {
    // Sound disabled
  }, []);

  const playClick = useCallback(() => {
    // Sound disabled
  }, []);

  return { playHover, playClick, muted, toggleSoundMute };
}
export type SoundHook = ReturnType<typeof useSound>;
