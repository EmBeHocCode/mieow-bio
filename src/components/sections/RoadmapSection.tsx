import { roadmap } from '../../data/site';
import { PixelSectionTitle } from '../pixel/PixelSectionTitle';
import { PixelTimeline } from '../pixel/PixelTimeline';

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      data-section
      className="scroll-mt-32 py-20 sm:py-24"
    >
      <div className="page-shell">
        <PixelSectionTitle
          label="Mission // AI Commerce"
          title="Lộ trình AI cho thương mại điện tử"
          description="Kế hoạch học tập và phát triển sản phẩm theo từng giai đoạn, tập trung vào việc ứng dụng AI vào bài toán thương mại điện tử."
        />

        <PixelTimeline groups={roadmap} />
      </div>
    </section>
  );
}
