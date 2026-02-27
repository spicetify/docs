---
title: PlayerState
description: PlayerState type definition.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type PlayerState = {
    timestamp: number;
    context_uri: string;
    context_url: string;
    context_restrictions: Record<string, string[]>;
    index?: {
        page: number;
        track: number;
    };
    track?: ProvidedTrack;
    playback_id?: string;
    playback_quality?: {
        bitrate_level: string;
        hifi_status?: string;
        strategy?: string;
        target_bitrate_available?: boolean;
        target_bitrate_level?: string;
    }
    playback_speed?: number;
    position_as_of_timestamp: number;
    duration: number;
    is_playing: boolean;
    is_paused: boolean;
    is_buffering: boolean;
    play_origin: {
        feature_identifier: string;
        feature_version: string;
        view_uri?: string;
        external_referrer?: string;
        referrer_identifier?: string;
        device_identifier?: string;
    };
    options: {
        shuffling_context?: boolean;
        repeating_context?: boolean;
        repeating_track?: boolean;
    };
    restrictions: Record<string, string[]>;
    suppressions: {
        providers: string[];
    };
    debug?: {
        log: string[];
    };
    prev_tracks?: ProvidedTrack[];
    next_tracks?: ProvidedTrack[];
    context_metadata: Metadata;
    page_metadata: Metadata;
    session_id: string;
    queue_revision?: string;
};
```

| Property | Type | Description |
| --- | --- | --- |
| `timestamp` | `number` | Timestamp. |
| `context_uri` | `string` | Context URI from which the track was played. |
| `context_url` | `string` | Context internal URL. |
| `context_restrictions` | `Record<string, string[]>` | Context restrictions. |
| `index` | `object` &#124; `undefined` | Track index. |
| `track` | [`ProvidedTrack`](/docs/development/api-wrapper/types/provided-track) &#124; `undefined` | Current track. |
| `playback_id` | `string` &#124; `undefined` | Playback ID. |
| `playback_quality` | `object` &#124; `undefined` | Playback quality. |
| `playback_speed` | `number` &#124; `undefined` | Playback speed. |
| `position_as_of_timestamp` | `number` | Position as of timestamp. Relative to the track's start. |
| `duration` | `number` | Track duration. |
| `is_playing` | `boolean` | Whether the track is playing. |
| `is_paused` | `boolean` | Whether the track is paused. |
| `is_buffering` | `boolean` | Whether the track is buffering. |
| `play_origin` | `object` | Play origin (client info). |
| `options` | `object` | Repeat and shuffle state. |
| `restrictions` | `Record<string, string[]>` | Restrictions. |
| `suppressions` | `object` | Suppressions from providers. |
| `debug` | `object` &#124; `undefined` | Debug info. |
| `prev_tracks` | [`ProvidedTrack[]`](/docs/development/api-wrapper/types/provided-track) &#124; `undefined` | Previous tracks. |
| `next_tracks` | [`ProvidedTrack[]`](/docs/development/api-wrapper/types/provided-track) &#124; `undefined` | Next tracks. |
| `context_metadata` | [`Metadata`](/docs/development/api-wrapper/types/metadata) | Context metadata. |
| `page_metadata` | [`Metadata`](/docs/development/api-wrapper/types/metadata) | Page metadata. |
| `session_id` | `string` | Session ID. |
| `queue_revision` | `string` &#124; `undefined` | Queue revision. |
