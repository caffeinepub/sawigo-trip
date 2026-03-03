import Time "mo:core/Time";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type TripInquiry = {
    name : Text;
    phone : Text;
    destination : Text;
    travelDate : Time.Time;
    numberOfGuests : Nat;
    budgetRange : Text;
    specialRequirements : Text;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    author : Text;
    publishedAt : Time.Time;
  };

  let tripInquiries = List.empty<TripInquiry>();
  let blogPosts = List.empty<BlogPost>();
  var nextBlogPostId = 1;

  // Initialize with sample blog posts
  public shared ({ caller }) func init() : async () {
    if (blogPosts.size() > 0) { return };
    blogPosts.add({
      id = 1;
      title = "Exploring the Himalayas";
      excerpt = "A journey through the majestic mountains...";
      content = "Full content about the Himalayas...";
      category = "India Travel";
      author = "Admin";
      publishedAt = Time.now();
    });
    blogPosts.add({
      id = 2;
      title = "Beaches of Goa";
      excerpt = "Sun, sand, and sea...";
      content = "Full content about Goa...";
      category = "India Travel";
      author = "Admin";
      publishedAt = Time.now();
    });
    blogPosts.add({
      id = 3;
      title = "Cultural Wonders of Rajasthan";
      excerpt = "Exploring the rich heritage...";
      content = "Full content about Rajasthan...";
      category = "India Travel";
      author = "Admin";
      publishedAt = Time.now();
    });
    nextBlogPostId := 4;
  };

  public shared ({ caller }) func submitInquiry(inquiry : TripInquiry) : async () {
    tripInquiries.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [TripInquiry] {
    tripInquiries.toArray();
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.toArray();
  };

  public shared ({ caller }) func createBlogPost(
    title : Text,
    excerpt : Text,
    content : Text,
    category : Text,
    author : Text,
  ) : async () {
    let post : BlogPost = {
      id = nextBlogPostId;
      title;
      excerpt;
      content;
      category;
      author;
      publishedAt = Time.now();
    };
    blogPosts.add(post);
    nextBlogPostId += 1;
  };

  public query ({ caller }) func getBlogPostById(id : Nat) : async BlogPost {
    let matchingPost = blogPosts.toArray().find(func(post) { post.id == id });
    switch (matchingPost) {
      case (null) { Runtime.trap("Blog post with id " # id.toText() # " does not exist.") };
      case (?blogPos) { blogPos };
    };
  };
};
