import {processVtt} from './vtt-processor'

test('processVtt returns map successfully', () => {
    const input = `WEBVTT

54
00:07:38.310 --> 00:07:45.990
Danny Burkes: I think that extends to the design of the software as well, not just the architecture. But as we think more like our approach to

55
00:07:47.760 --> 00:07:49.320
Danny Burkes: Visual and UX design.

56
00:07:50.580 --> 00:07:54.930
Danny Burkes: I mean, our approach air is very specifically delay as long as possible.

57
00:07:55.560 --> 00:08:05.700
Shaun Anderson: And it fits, not just with visual design for the for the UI. So because a lot of the software we work on doesn't have you eyes, but it's you kind of idea. There's different ways of

58
00:08:06.090 --> 00:08:20.130
Shaun Anderson: Gathering enough information to feel comfortable based on the knowledge we have to start aiming a direction. And it's the same basic principle is maybe different information gathering techniques, but the the principles still there. Yeah.

59
00:08:20.730 --> 00:08:26.850
Joe Moore: Now the interesting thing about just taking that approach from the beginning of of delaying certain decisions and

60
00:08:28.290 --> 00:08:43.830
Joe Moore: Kind of common you would like was like, especially when you like combine some of the principles like starting simple with embracing change when you build that in early, then it can get the team in used to a cadence of of constant change.

61
00:08:44.940 --> 00:08:51.810
Joe Moore: You know, I think that there there can be a world where they were. Someone says, like, we're gonna we're going to map out this entire architecture and map out. I "
expect(true).toBe(false)
`
    const result = processVtt(input)
    expect(result).toEqual(new Map([['Danny Burkes', 13], ['Joe Moore', 28], ['Shaun Anderson', 24]]))
})