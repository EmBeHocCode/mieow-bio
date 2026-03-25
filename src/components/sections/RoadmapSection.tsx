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
          description="Timeline chuyển từ kiểu corporate mảnh sang pixel timeline đậm hơn, với node vuông, badge thời gian và accordion mượt nhưng không rối."
        />

        <PixelTimeline groups={roadmap} />
      </div>
    </section>
  );
}
