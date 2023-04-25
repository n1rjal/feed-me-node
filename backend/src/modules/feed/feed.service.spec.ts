import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from './feed.service';
import { PublishToFeedDto } from './dto/publish-to-feed.dto';
import { FeedType } from './feed.interface';

describe('FeedService', () => {
  let service: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedService],
    }).compile();

    service = module.get<FeedService>(FeedService);
  });

  const dtoData: PublishToFeedDto = new PublishToFeedDto();
  dtoData.feedType = FeedType.APPLICATION;
  dtoData.title = 'Test Title';
  dtoData.message = 'Test Message';
  dtoData.room = 'Test Room';

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate id as uuid v4', async () => {
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const data = await service.sendFeed(dtoData);

    console.log(data);

    expect(data).toBeDefined();
    expect(data.id).toMatch(uuidV4Regex);
  });

  it('Should give correct feed type', async () => {
    const data = await service.sendFeed(dtoData);
    expect(data.feedType).toBe(FeedType.APPLICATION);
  });
});
